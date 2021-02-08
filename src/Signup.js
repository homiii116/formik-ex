/** @jsx jsx */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from '@emotion/styled/macro';
import { jsx } from '@emotion/react/macro';
import { passwordValidator, emailValidator, nameValidator } from './lib/validators';

const formStyle = {
  display: 'flex',
  flexDirection: 'colum',
  width: '400px'
}

const fieldStyle = {
  marginBottom: '1em',
  padding: '5px 10px',
}

const ErrorMessage = styled.div({
  color: 'red',
  margin: '0 0 3px',
  fontSize: '0.9em'
})

const CustomLabel = styled.label({
  marginBottom: 3,
  fontSize: '0.9em'
})

const handleSubmit = (values, actions) => {
  mockSignup(values)
  .then(data => {
    actions.setSubmitting(false); //isSubmittingをfalseにする
    alert(data.message)
  })
  .catch((error) => {
    const errors = {
      server: error.message //サーバーエラーのメッセージを登録する
    }
    actions.setSubmitting(false); //isSubmittingをfalseにする
    actions.setErrors(errors); //新しいerrorsオブジェクトをFormikのrender propsに渡す
  })
}

function mockSignup(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 10)
      if(randomNum <= 7) {
        resolve({
          success: true,
          message: '登録に成功しました。'
        })
      } else {
        reject({
          success: false,
          message: 'ネットワークエラーが発生しました。'
        })
      }
    }, 2000)
  })
}

const validate = (({ email, name, password }) => {
  return Promise.all([
    passwordValidator(password),
    emailValidator(email),
    nameValidator(name)
  ])
  .then((results) => {
    const errors = {}
    results.forEach(result => {
      if (result.error) {
        errors[result.type] = result.error
      }
    })
    if (Object.keys(errors).length > 0) {
      throw errors
    }
  })
})

export const Signup = () => (
  <div>
    <h1>ユーザー登録</h1>
    <Formik
      validateOnBlur={true}
      validateOnChange={false}
      initialValues={{
        name: '',
        email: '',
        password: ''
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <Form onSubmit={handleSubmit} css={formStyle}>
            {errors.server && <ErrorMessage>{errors.server}</ErrorMessage>}
            <CustomLabel>メールアドレス</CustomLabel>
            <Field type='email' name='email' css={fieldStyle} />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <CustomLabel>名前</CustomLabel>
            <Field type='text' name='name' css={fieldStyle} />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            <CustomLabel>パスワード</CustomLabel>
            <Field type='text' name='password' css={fieldStyle} />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <button type='submit' disabled={isSubmitting} css={{ marginTop: '1em' }}>
              submit
            </button>            
          </Form>
        );
      }}

    </Formik>
  </div>
)