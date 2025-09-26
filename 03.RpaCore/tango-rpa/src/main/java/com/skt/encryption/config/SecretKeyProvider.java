package com.skt.encryption.config;

import org.springframework.stereotype.Component;
import com.skt.encryption.util.AESUtil;

@Component
public class SecretKeyProvider {

    private final String secretKey;

    public SecretKeyProvider() {
        // 여기 수정
        this.secretKey = System.getProperty("ENCRYPTION_SECRET_KEY");

        if (this.secretKey == null || this.secretKey.isEmpty()) {
            throw new IllegalStateException("ENCRYPTION_SECRET_KEY must be provided as a system property (-D option).");
        }
        AESUtil.validateKey(this.secretKey);
    }

    public String getSecretKey() {
        return this.secretKey;
    }
}
