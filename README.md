1) try to understand code flow,
2)  try to understand csn file or metadata
3) expose few more entities
4) expose 1 level, 2 level, 3 level navigatin data 
Products?$expand=Order_Details($expand=Order($expand=Customer))
entity PerPerson                    as
    projection on sf_api_service.PerPerson {
        dateOfBirth,
        countryOfBirth,
        personIdExternal,
        placeOfBirth,
        customDouble1  
    }

entity PerPersonal                    as
    projection on sf_api_service.PerPersonal {
       displayName,
       gender,
       customString2,
       personIdExternal,
       maritalStatus, 
       maritalStatusNav,
       salutationNav,
       nativePreferredLang,
       nativePreferredLangNav,
       nationality,
       personNav : Association to PerPerson on personNav.personIdExternal =personIdExternal
    }