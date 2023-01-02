import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8080',
    realm: 'Fullstack-Project',
    clientId: 'angular',
    // credentials: {
    //     secret: 'DUBRxiYWrYlWxKmrVRC0OLPPEhryAWHP'
    // }
  

};

export default keycloakConfig;