import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { QueryClient, useMutation } from '@tanstack/react-query';
import LoginConnect from '@untr/apps-coip/app/login-connect/_layout';
import { Wrapper } from '../../wrapper/wrapper';
import Realm from 'realm';
import schemas from '@untr/apps-coip/schemas';
import { tanstackQueryMock } from '@untr/apps-coip/__mocks__/tanstack.mock';
import { routerMock } from '@untr/apps-coip/__mocks__/router.mock';
import { router } from 'expo-router';
import { zustandMock } from '@untr/apps-coip/__mocks__/zustand.mock';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import { TestUnitIDConstant } from '@untr/apps-coip/constants/testUnitID.constants';

const schemaVersion = 3;

const mockAddRealm = async () => {
  const configMockDB: Realm.Configuration = {
    schema: Object.values(schemas),
    schemaVersion,
    path: 'mockDb.realm',
    deleteRealmIfMigrationNeeded: true,
    inMemory: true,
  };

  try {
    await Realm.open(configMockDB);
  } catch (error) {
    console.log('Error MOCK DB', error);
  }
};

describe('Login Component test', () => {
  let realm;
  let queryClient;
  beforeEach(async () => {
    jest.clearAllMocks();
    realm = await mockAddRealm();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
          gcTime: Infinity,
        },
      },
    });
  });
  const mockMutate = tanstackQueryMock.fn().mockReturnValue({ useMutation });

  const routeMock = routerMock.fn().mockReturnValue({ router });
  const changeLoading = zustandMock.fn().mockReturnValue({ LoadingState });

  test('is Login Component Rendered?', async () => {
    const renderLogin = render(
      <Wrapper realm={realm} queryClient={queryClient}>
        <LoginConnect />
      </Wrapper>
    );
    await waitFor(() => {
      expect(renderLogin.toJSON()).toMatchSnapshot();
    });
  });

  test('Error show when loggin is Fail?', async () => {
    mockMutate.mockImplementationOnce(() => {
      throw { response: { data: { errors: { UserName: ['Invalid credentials'] } } } };
    });

    const { findByText, getByTestId, getByText, debug } = render(
      <Wrapper realm={realm} queryClient={queryClient}>
        <LoginConnect />
      </Wrapper>
    );

    debug();

    fireEvent.changeText(getByTestId(TestUnitIDConstant.LOGINCONNECT_FORM_USERNAME), 'testuser');
    fireEvent.changeText(getByTestId(TestUnitIDConstant.LOGINCONNECT_FORM_PASSWORD), 'password123');
    fireEvent.press(getByTestId(TestUnitIDConstant.LOGINCONNECT_BUTTON_LOGIN));

    await waitFor(() => findByText('Login Failed!'));
    expect(getByText('Login Failed!')).toBeTruthy();
    expect(getByText('Invalid credentials')).toBeTruthy();
  });

});
