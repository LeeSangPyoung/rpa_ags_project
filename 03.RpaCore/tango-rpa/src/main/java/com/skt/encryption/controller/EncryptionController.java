package com.skt.encryption.controller;


import org.springframework.web.bind.annotation.*;

import com.skt.encryption.config.SecretKeyProvider;
import com.skt.encryption.dto.ErrorResponse;
import com.skt.encryption.util.AESUtil;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class EncryptionController {

    private final SecretKeyProvider secretKeyProvider;

    public EncryptionController(SecretKeyProvider secretKeyProvider) {
        this.secretKeyProvider = secretKeyProvider;
    }

    @PostMapping("/encrypt")
    public ResponseEntity<?> encrypt(@RequestBody String plainText) {
        try {
            String encrypted = AESUtil.encrypt(plainText, secretKeyProvider.getSecretKey());
            return ResponseEntity.ok(encrypted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/decrypt")
    public ResponseEntity<?> decrypt(@RequestBody String cipherText) {
        try {
            String decrypted = AESUtil.decrypt(cipherText, secretKeyProvider.getSecretKey());
            return ResponseEntity.ok(decrypted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
