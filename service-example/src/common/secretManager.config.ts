import vault from 'node-vault';

export async function SecretManager(path: string) {
  try {
    const vaultClient = vault({
      apiVersion: 'v1',
      endpoint: 'http://127.0.0.1:8200',
      token: '123456789',
    });

    const { data: roleId } = await vaultClient.getApproleRoleId({
      role_name: 'admin',
    });
    const { data: secretId } = await vaultClient.getApproleRoleSecret({
      role_name: 'admin',
    });

    const result = await vaultClient.approleLogin({
      role_id: roleId.role_id,
      secret_id: secretId.secret_id,
    });

    vaultClient.token = result.auth.client_token;

    return vaultClient
      .read(`secret/data/${path}`)
      .then((vaultRes: any) => {
        return vaultRes.data.data;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
}
