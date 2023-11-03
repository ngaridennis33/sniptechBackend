import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  const privateKey='-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAh8zRAP6R3tHRrQHWzfNsSvyIzyjCCGjbZWrCrzVRgG+stds/\nqHuQKEkl5UyL5I3ZSXwk1XRLe5C9vm2FALX/WrMHS527I6MYNo226QV2RAHHoPqH\nsCASWybO2JSMsiWIP+3JDFb13y7gvzZkdKfVQzhqvbnQ/oc9NSZcjVSM/KYuerjY\nnQRI+INpwG9p7wHi5qvpguYuhPJ0IjeLuzzeAWraG3v7M8Wpn/cxapngUdSYeDdK\nSGWyYi6mQDqnE6ALKJEhJkeneAmiMnoaCoJUdVLK50YjZJ5PS2hDYKj92Y+z/dCr\nMOABSOa6ICQ0OyYcGCN+GC9BN++U+L300IXC5wIDAQABAoIBAAhk5aptEfE3AQHz\nsiZq3I/KCl7bwxqn+J/NOJmB7zbEMGXRVp8AfEmxM9F3qNII3pyHOvOiy6Oor8Hc\nnTMNDOq7VEEdT9sFEtMUcXD38HaFsaRGuCpv4RKXVIPYstW0MjbZaOsFWQ9ho2zO\nXOlFEo6kJxzxJnUFQQhPBbuKtWhMefdE6cZ3XcE12e/0CiDPTeWXqFH3nqYB8M/T\n875GTITnKV0Sw/WehbqCx4CddB+exjoK30RtcdP63B0V6yQjllYMGJ7RvWqAC2bi\nCEtN/x0CGb9L9iDajkGNaojcoH6cFskdD4pjCFHGgitPtSeIbY8uOIskvg/ikAtv\nwpdsBgkCgYEA32wm12KNsuqWkgB0KmsTQZDHy8X10CRqjXFe5yc7cQdawB/gRE1s\nilQmWHt1kb6hFSNORWvcZ69QvnsUB5pdBe8dg2voC8XdiOzfvE4MYLmGL6zdiVFM\ntj+gY/FqDV5DFHo2gBF+aU8EIYiUy9B9xJjhDJBhquS/qtws2/hDUy0CgYEAm5nr\n3T8xoJJHZA22PBzFko34+c3g+ToCIVmG1VmMVvjyET9H+t9dxtJzYdnpTM0HytDk\nIiooNZCin4riO38n8Xe73kE1EEY1FBgzujs1yJJUjX1ptmXvAgE/fnoa5WheCixX\nNFIXCwB33Uur8TePT59gSeJ4Alj2KMzkIe7oSuMCgYEA2bSVFINf99tG5PW0PDEi\nDl15kkJPiIYznae/BhbggP7dmyB0c5nODex5gPasVVwfsm04s8SqfA4E69caaV4t\nDr81Tv4ymmYvvGC0ktSqkwW0j3guVsP1sBDHxRtUb7pOOwHrYVeqigsIx3RDKWb7\nZjph8NAvm0pSybbJr352e/ECgYA2GYQaPpiAnZtYvDO6Hr7Kv7XrFJu9y19mPPxW\nPXY/3vo66Oeb4AF42T7orJ0i6L5m084d2s50IT+JfP4/dWxr1hdppP5QFDjsLaX+\ngAupGsdvEkWo9zPsXIa48LddP7ZCjzwaotgEKTuDo4W6rniTVHRj++uB1XBwqxw+\neBQnxQKBgQDIitRZgvJC5vbO3vsbPXvrL7eEaHpx+1M47GyUrVJ+gh/ylkimqXPV\ntY27+fChRPKEHbQoTdAbgBF/NP3W1U1l4zW6/Q+qFb9kIdXv7lsd48mBbdIUbA/u\nPh3qqk+1NmrG5r9IRF9V62ag4twRy0iKX+uVqT5d5pYt9M1FccYKwU9w2jvblGkA\n9MEhI53yobrjrT9HjjwNuzB4wfs59F6b/yiNe5nMMidavRe7yI6j5g==\n-----END RSA PRIVATE KEY-----';
  // const privateKey = Buffer.from(
  //   config.get<string>(keyName),
  //   'base64'
  // ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      'base64'
    ).toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
