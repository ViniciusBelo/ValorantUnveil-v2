package com.educandoweb.course.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Imagens dos agentes (pasta img/ na raiz do projeto)
        registry.addResourceHandler("/img/**")
                .addResourceLocations("file:./img/")
                .setCachePeriod(3600);

        // Arquivos estáticos do frontend (pasta public/)
        registry.addResourceHandler("/**")
                .addResourceLocations("file:./public/")
                .setCachePeriod(0);
    }
}
