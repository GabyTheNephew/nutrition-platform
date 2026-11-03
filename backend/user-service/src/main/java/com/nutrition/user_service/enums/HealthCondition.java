package com.nutrition.user_service.enums;

public enum HealthCondition {
    NONE,
    AUTOIMMUNE_HYPERTHYROIDISM, // Basedow - restricție alimente bogate în iod
    HYPOTHYROIDISM_HASHIMOTO,   // Hashimoto - atenție la goitrogene crude / soia
    DIABETES_TYPE_2,            // Diabet / rezistență la insulină - indice glicemic redus
    HYPERTENSION,               // Tensiune arterială - sodiu redus
    GOUT,                       // Gută - conținut redus de purine
    IBS,                        // Sindrom colon iritabil - principii Low-FODMAP
    GERD                        // Reflux gastroesofagian - fără alimente acide / iritante
}