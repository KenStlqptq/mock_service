const constant = {
    PROTO_FIELD: {
        LEN: 1,
        CMD: 10,
        INDEX: 20,
        FLAG: 30,
        CHECKSUM: 40,
        OTHERS: 99,
    },

    PROTO_TYPE: {
        TCP: 1,
        HTTPS: 2,
        HTTP: 3,
        UDP: 4,
        WS: 5
    },

    ACCOUNT_MODE: {
        CONFIG: 1,
        FILE: 2
    }
};

module.exports = constant;