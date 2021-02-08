
export const emailValidator = (val) => {
  return new Promise((resolve) => {
    let error = null;
    if (val === '') {
      error = 'メールアドレスは必須です。';
    }  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
      error = 'メールアドレスの形式が正しくありません。';
    }
    resolve({
      type: 'email',
      error,
    });
  })
}

export const nameValidator = (val) => {
  return new Promise((resolve) => {
    let error = null;
    if (val === '') {
      error = '名前は必須です。'
    }
    resolve({
      type: 'name',
      error,
    });
  })
}

export const passwordValidator = (val) => {
  return new Promise((resolve) => {
    let error = null;
    if (val === '') {
      error = 'パスワードは必須です。';
    } else if (val.length < 6) {
      error = 'パスワードは最低6文字で入力してください。'
    }
    resolve({
      type: 'password',
      error,
    });
  })
}