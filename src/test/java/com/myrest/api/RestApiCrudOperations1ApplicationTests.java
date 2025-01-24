package com.myrest.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application.properties")
class RestApiCrudOperations1ApplicationTests {

    @Test
    void contextLoads() {
        // This test verifies if the Spring application context loads successfully
    }

    @Test
    void applicationStartsSuccessfully() {
        // This test verifies the application starts without errors
    }
}
