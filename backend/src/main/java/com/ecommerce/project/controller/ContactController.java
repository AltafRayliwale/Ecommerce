package com.ecommerce.project.controller;

import com.ecommerce.project.payload.ContactDTO;
import com.ecommerce.project.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/public/contact")
    public ResponseEntity<ContactDTO> sendMessage(
            @RequestBody ContactDTO contactDTO) {

        ContactDTO savedMessage =
                contactService.saveMessage(contactDTO);

        return new ResponseEntity<>(
                savedMessage,
                HttpStatus.CREATED
        );
    }

    @GetMapping("/admin/contacts")
    public ResponseEntity<List<ContactDTO>> getAllMessages(
            Authentication authentication) {

        System.out.println("===== CONTACT CONTROLLER HIT =====");

        if (authentication != null) {
            System.out.println("===== AUTH USER: "
                    + authentication.getName() + " =====");

            System.out.println("===== AUTH AUTHORITIES: "
                    + authentication.getAuthorities() + " =====");
        } else {
            System.out.println("===== AUTHENTICATION IS NULL =====");
        }

        return ResponseEntity.ok(
                contactService.getAllMessages()
        );
    }

    @DeleteMapping("/admin/contacts/{contactId}")
    public ResponseEntity<String> deleteMessage(
            @PathVariable Long contactId) {

        contactService.deleteMessage(contactId);

        return ResponseEntity.ok(
                "Contact message deleted successfully"
        );
    }
}