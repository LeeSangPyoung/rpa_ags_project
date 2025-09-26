package com.rpa.utilities;

import com.rpa.common.Constant;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class EncryptUtil {

    /**
     * Create Cipher for encrypt/decrypt
     * @param mode int
     * @return Cipher
     */
    private static Cipher getCipher(int mode) throws Exception {
        SecretKeySpec key = new SecretKeySpec(Constant.SECRET_KEY.getBytes(), Constant.AES);
        Cipher cipher = Cipher.getInstance(Constant.AES);
        cipher.init(mode, key);
        return cipher;
    }

    /**
     * Encrypt a string
     * @param value String
     * @return String
     */
    public static String encrypt(String value) {
        if (value == null) return null;
        try {
            Cipher cipher = getCipher(Cipher.ENCRYPT_MODE);
            byte[] encrypted = cipher.doFinal(value.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Decrypt a string
     * @param encrypted String
     * @return String
     */
    public static String decrypt(String encrypted) {
        if (encrypted == null) return null;
        try {
            Cipher cipher = getCipher(Cipher.DECRYPT_MODE);
            byte[] original = cipher.doFinal(Base64.getDecoder().decode(encrypted));
            return new String(original);
        } catch (Exception e) {
            return encrypted;
        }
    }
}
