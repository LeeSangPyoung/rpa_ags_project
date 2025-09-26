package com.rpa.utilities;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;

import java.io.IOException;
import java.text.DecimalFormat;

public class ObjectMapperUtility {

    /**
     * Constructor(Singleton Pattern)
     */
    private ObjectMapperUtility() {
    }

    /**
     * Create object mapper
     *
     * @param forWrite boolean
     * @param forRead boolean
     * @return ObjectMapper
     */
    public static ObjectMapper createObjectMapper(boolean forWrite, boolean forRead) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (forRead) {
                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            }
            if (forWrite) {
                SimpleModule module = new SimpleModule("DoubleSerializer");
                module.addSerializer(Double.class, new DoubleSerializer());
                module.addSerializer(double.class, new DoubleSerializer());
                objectMapper.registerModule(module);
            }
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
        return objectMapper;
    }

    /**
     * DoubleSerializer class
     */
    public static class DoubleSerializer extends JsonSerializer<Double> {
        @Override
        public void serialize(Double value, JsonGenerator gen, SerializerProvider serializers)
                throws IOException {
            DecimalFormat df = new DecimalFormat("#.#");
            df.setMaximumFractionDigits(20);
            gen.writeNumber(df.format(value));
        }
    }
}
