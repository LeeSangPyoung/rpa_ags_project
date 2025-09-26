package com.rpa.utilities;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.util.ClassUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class BeanUtility {

    /**
     * Constructor(Singleton Pattern)
     */
    private BeanUtility() {
    }

    /**
     * Clone bean object
     *
     * @param target Object
     * @param <T>    optional
     * @return Object
     */
    public static <T> T cloneObject(T target) {
        try {
            ObjectMapper mapper = ObjectMapperUtility.createObjectMapper(true, true);
            return mapper.readValue(
                    mapper.writeValueAsString(target),
                    mapper.getTypeFactory().constructType(target.getClass())
            );
        } catch (Exception exception) {
            throw new RuntimeException();
        }
    }

    /**
     * Clone bean object
     *
     * @param sources Object list
     * @param clazz   Class
     * @param <T>     optional
     * @return list object
     */
    public static <T> List<T> convertValue(List<?> sources, Class<T> clazz) {
        return convertValue(sources, clazz, false);
    }

    /**
     * Clone bean object
     *
     * @param sources Object list
     * @param clazz   Class
     * @param isNullFilter is a flag to determine whether you need to remove null objects.
     * @param <T>     optional
     * @return list object
     */
    public static <T> List<T> convertValue(List<?> sources, Class<T> clazz, boolean isNullFilter) {
        try {
            ObjectMapper objectMapper = ObjectMapperUtility.createObjectMapper(true, true);
            List<T> myObjects = objectMapper.readValue(
                    objectMapper.writeValueAsString(sources),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, clazz)
            );
            if (myObjects == null) {
                return new ArrayList<>();
            }

            if (isNullFilter) {
                return myObjects.stream().filter(item -> !(item == null)).collect(Collectors.toList());
            }

            return myObjects;
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Convert bean object
     *
     * @param source      Object
     * @param targetClass Class Name
     * @param <T>         optional
     * @return true/false
     */
    public static <T> T convertValue(Object source, Class<T> targetClass) {
        try {
            ObjectMapper objectMapper = ObjectMapperUtility.createObjectMapper(true, true);
            return objectMapper.convertValue(source, targetClass);
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Create objects with values mapping to the values(by type class) of other objects
     * (In case of duplicate fields, the field value of the last object will be received)
     *
     * @param targetClass Class
     * @param sourceIn    Object list
     * @return result
     */
    public static <T> T convertValue(Class<T> targetClass, Object... sourceIn) {
        try {
            ModelMapper model = new ModelMapper();
            model.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
            model.getConfiguration().setSkipNullEnabled(true);
            Constructor<T> constructor = targetClass.getDeclaredConstructor();
            T result = constructor.newInstance();
            for (Object source : sourceIn) {
                model.map(source, result);
            }
            return result;
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Compare object
     *
     * @param first       Object
     * @param other       Object
     * @param targetClass Class
     * @param <T>         Optional
     * @return true/false
     */
    public static <T> boolean equals(T first, T other, Class<T> targetClass) {
        try {
            for (Field f : targetClass.getDeclaredFields()) {
                f.setAccessible(true);

                if (f.get(first) == null) {
                    if (f.get(other) == null) {
                        continue;
                    } else {
                        return false;
                    }
                }
                if (!f.get(first).equals(f.get(other)))
                    return false;
            }
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    /**
     * To compare list of object and return equal status(true/false).
     *
     * @param firstList List<T>
     * @param otherList List<T>
     * @return true/false
     */
    public static <T> boolean equals(List<T> firstList, List<T> otherList) {
        try {
            if (CollectionUtils.isEmpty(firstList) && CollectionUtils.isEmpty(otherList)) {
                return true;
            }
            if (CollectionUtils.isEmpty(firstList) || CollectionUtils.isEmpty(otherList)) {
                return false;
            }

            if (firstList.size() != otherList.size()) {
                return false;
            }

            for (int i = 0; i < firstList.size(); i++) {
                if (!equals(firstList.get(i), otherList.get(i), Object.class)) {
                    return false;
                }
            }
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    /**
     * Check empty all field
     *
     * @param item        Object
     * @param targetClass Class
     * @param <T>         optional
     * @return true/false
     */
    @SuppressWarnings("unchecked")
    public static <T> boolean isEmptyByAllField(T item, Class<T> targetClass) {
        if (ObjectUtils.isEmpty(item)) {
            return true;
        }
        Object obj;
        Class<?> clazz;
        try {
            for (Field f : getAllFields(targetClass)) {
                f.setAccessible(true);
                obj = f.get(item);
                clazz = f.getType();
                if (!ClassUtils.isPrimitiveOrWrapper(clazz) && !(clazz.equals(BigDecimal.class) || clazz.equals(String.class)
                        || clazz.equals(Date.class)) && obj != null) {
                    return isEmptyByAllField((T) obj, (Class<T>) clazz);
                }
                if (!ObjectUtils.isEmpty(obj)) {
                    return false;
                }
            }
        } catch (IllegalAccessException e) {
            return false;
        }
        return true;
    }

    /**
     * Check empty list when All Element Empty
     *
     * @param list        Object list
     * @param targetClass Class
     * @param <T>         optional
     * @return true/false
     */
    public static <T> boolean isEmptyByAllField(List<T> list, Class<T> targetClass) {

        if (CollectionUtils.isEmpty(list)) {
            return true;
        }

        for (T item : list) {
            if (ObjectUtils.isEmpty(item)) {
                continue;
            }

            if (!isEmptyByAllField(item, targetClass)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Create new object with null
     *
     * @param obj   Object
     * @param clazz Class
     * @param <T>   optional
     * @return Object
     */
    public static <T> T createNewIfNull(T obj, Class<T> clazz) {
        if (!ObjectUtils.isEmpty(obj)) {
            return obj;
        }
        try {
            obj = clazz.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            return null;
        }
        return obj;
    }

    /**
     * Set value by field
     *
     * @param obj       Object
     * @param clazz     Class
     * @param <T>       optional
     * @param fieldName String
     * @param value     Object
     */
    public static <T> void setValueByField(T obj, Class<T> clazz, String fieldName, Object value) {
        if (ObjectUtils.isEmpty(obj) || ObjectUtils.isEmpty(fieldName)) {
            return;
        }
        try {
            Field[] allField = clazz.getDeclaredFields();
            List<Field> fields = Arrays.stream(allField).filter(x -> fieldName.equals(x.getName())).toList();
            if (!CollectionUtils.isEmpty(fields)) {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);
                field.set(obj, value);
            }
        } catch (Exception ex) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Get all fields include superclasses
     *
     * @param clazz Class
     */
    private static List<Field> getAllFields(Class<?> clazz) {
        // Get fields of the current class
        List<Field> result = new ArrayList<>(Arrays.stream(clazz.getDeclaredFields()).toList());

        // Get the superclass
        Class<?> superClass = clazz.getSuperclass();

        // Recursively call the method for the superclass
        if (superClass != null) {
            result.addAll(getAllFields(superClass));
        }
        return result;
    }
}
