# BackEnd
## Lancer le serveur de dev

```bash
mvn spring-boot:run
```

## Base de donnée

- Nom : ace_it_database
- Interface utilisé : Adminer
  - url : localhost/adminer
  - utilisateur : matthis_ace_it

## Les différent role du user (pour respecter ce nommage)
- admin
- entraineur
- joueur

# FrontEnd

## Couleurs
'50': '#f3f7ee',
'100': '#e5edda',
'200': '#cddcba',
'300': '#adc690',
'400': '#90af6c',
'500': '#688748',
'600': '#58743c',
'700': '#445a31',
'800': '#39492b',
'900': '#323f28',
'950': '#192112',



# Documentation BackEnd
## Getting Started

### Reference Documentation

For further reference, please consider the following sections:

-   [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
-   [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.3/maven-plugin)
-   [Create an OCI image](https://docs.spring.io/spring-boot/3.5.3/maven-plugin/build-image.html)
-   [Spring Web](https://docs.spring.io/spring-boot/3.5.3/reference/web/servlet.html)
-   [Spring Data JPA](https://docs.spring.io/spring-boot/3.5.3/reference/data/sql.html#data.sql.jpa-and-spring-data)
-   [Spring Boot DevTools](https://docs.spring.io/spring-boot/3.5.3/reference/using/devtools.html)

### Guides

The following guides illustrate how to use some features concretely:

-   [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
-   [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
-   [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
-   [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.
