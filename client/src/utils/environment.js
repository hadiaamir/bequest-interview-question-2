const currentEnvironment = "development";

const env = {
  development: "http://localhost:8080/",
};

const ConfigurationService = {
  /**
   * Returns the environment endpoints set above
   *
   * @return {String}
   */
  resolveApi: () => {
    return env[currentEnvironment];
  },
};

export default ConfigurationService;
