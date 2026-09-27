package com.ecommerce.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.math.RoundingMode;

@Service
public class PayPalService {

    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.base.url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getAccessToken() {

        String credentials = clientId + ":" + clientSecret;

        String encodedCredentials = Base64.getEncoder()
                .encodeToString(credentials.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + encodedCredentials);
        headers.setContentType(
                MediaType.APPLICATION_FORM_URLENCODED
        );

        MultiValueMap<String, String> body =
                new LinkedMultiValueMap<>();

        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                baseUrl + "/v1/oauth2/token",
                request,
                String.class
        );

        try {
            JsonNode json = objectMapper.readTree(response.getBody());
            return json.get("access_token").asText();
        } catch (Exception e) {
            throw new RuntimeException(
                    "Unable to obtain PayPal access token",
                    e
            );
        }
    }

    public String createOrder(BigDecimal amount) {

        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(
                "PayPal-Request-Id",
                UUID.randomUUID().toString()
        );

        Map<String, Object> amountMap = new HashMap<>();
        amountMap.put("currency_code", "USD");
        amountMap.put("value", amount.setScale(2, java.math.RoundingMode.HALF_UP).toString());

        Map<String, Object> purchaseUnit = new HashMap<>();
        purchaseUnit.put("amount", amountMap);

        Map<String, Object> body = new HashMap<>();
        body.put("intent", "CAPTURE");
        body.put(
                "purchase_units",
                java.util.List.of(purchaseUnit)
        );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                baseUrl + "/v2/checkout/orders",
                request,
                String.class
        );

        return response.getBody();
    }

    public String captureOrder(String orderId) {

        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(
                "PayPal-Request-Id",
                UUID.randomUUID().toString()
        );

        HttpEntity<String> request =
                new HttpEntity<>("{}", headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                baseUrl + "/v2/checkout/orders/"
                        + orderId
                        + "/capture",
                request,
                String.class
        );

        return response.getBody();
    }
}