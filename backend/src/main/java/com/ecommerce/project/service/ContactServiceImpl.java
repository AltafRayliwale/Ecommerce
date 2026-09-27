package com.ecommerce.project.service;

import com.ecommerce.project.model.Contact;
import com.ecommerce.project.payload.ContactDTO;
import com.ecommerce.project.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public ContactDTO saveMessage(ContactDTO contactDTO) {

        Contact contact = new Contact();

        contact.setName(contactDTO.getName());
        contact.setEmail(contactDTO.getEmail());
        contact.setMessage(contactDTO.getMessage());

        Contact savedContact = contactRepository.save(contact);

        return new ContactDTO(
                savedContact.getContactId(),
                savedContact.getName(),
                savedContact.getEmail(),
                savedContact.getMessage()
        );
    }

    @Override
    public List<ContactDTO> getAllMessages() {

        return contactRepository.findAll()
                .stream()
                .map(contact -> new ContactDTO(
                        contact.getContactId(),
                        contact.getName(),
                        contact.getEmail(),
                        contact.getMessage()
                ))
                .toList();
    }

    @Override
    public void deleteMessage(Long contactId) {

        if (!contactRepository.existsById(contactId)) {
            throw new RuntimeException("Contact message not found");
        }

        contactRepository.deleteById(contactId);
    }
}