using System.Security.Cryptography;

namespace WorkpackMVC.Auth
{
  public class RSAKeyHelper
  {
    public static RSAParameters GenerateKey()
    {
      using (RSA rsa = RSA.Create())
      {
        rsa.KeySize = 2048;
        // when the key next gets used it will be created at that keysize.
        return rsa.ExportParameters(true);
      }
    }
  }
}
