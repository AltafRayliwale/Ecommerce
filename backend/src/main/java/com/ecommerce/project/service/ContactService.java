package com.ecommerce.project.service;

import com.ecommerce.project.payload.ContactDTO;

import java.util.List;

public interface ContactService {

    ContactDTO saveMessage(ContactDTO contactDTO);

    List<ContactDTO> getAllMessages();

    void deleteMessage(Long contactId);
}