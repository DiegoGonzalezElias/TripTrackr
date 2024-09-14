export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.tsx?$": ['ts-jest', {
        tsconfig: 'tsconfig.app.json', // Apunta al archivo tsconfig específico para pruebas
      }],
    },
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };