import vault from 'node-vault';

export async function SecretManager() {
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

    vaultClient
      .read(`secret/data/test-connect`)
      .then((r: any) => {
        console.log('RRRR', r.data.data);
      })
      .catch((e) => {
        console.log('FFFFFF', e.response.body.warnings);
      });
    //
    // const { data } = await vaultClient.read(`secret/${path}`);
    //
    // return data.data;
    // return ['1'];
  } catch (error) {
    // console.log(error);
    // throw error;
  }
}
