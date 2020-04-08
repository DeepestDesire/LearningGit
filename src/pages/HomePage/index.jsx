import React, { Fragment } from 'react'
import TextField from '@atlaskit/textfield'
import Button, { ButtonGroup } from '@atlaskit/button'
// import { Checkbox } from '@atlaskit/checkbox'
import Form, {
  // CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form'

export default props => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      maxWidth: '100%',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form
      onSubmit={data => {
        console.log('form data', data)
        saveUserInfo(data)
        return new Promise(resolve => {
          setTimeout(resolve, 2000)
        }).then(() => {
          props.history.push('/game')
          return data.username === 'error' ? { username: 'IN_USE' } : undefined
        })
      }}
    >
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Field
            name="username"
            label="姓名"
            isRequired
            defaultValue=""
            validate={value =>
              value && value.length < 2 ? 'TOO_SHORT' : undefined
            }
          >
            {({ fieldProps, error }) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
                {!error && (
                  <HelperMessage>
                    {/* You can use letters, numbers & periods. */}
                  </HelperMessage>
                )}
              </Fragment>
            )}
          </Field>
          <Field
            name="mobile"
            label="手机号"
            defaultValue=""
            isRequired
            validate={value =>
              value && !checkPhone(value) ? 'TOO_SHORT' : undefined
            }
          >
            {({ fieldProps, error, valid, meta }) => (
              <Fragment>
                <TextField type="mobile" {...fieldProps} />
                {!error && !valid && (
                  <HelperMessage>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </HelperMessage>
                )}
                {error && <ErrorMessage>请输入是十一位手机号.</ErrorMessage>}
                {valid && meta.dirty ? (
                  <ValidMessage>手机号位数正确</ValidMessage>
                ) : null}
              </Fragment>
            )}
          </Field>
          {/* <CheckboxField name="remember" label="Remember me" defaultIsChecked>
            {({ fieldProps }) => (
              <Checkbox {...fieldProps} label="Always sign in on this device" />
            )}
          </CheckboxField> */}
          <FormFooter>
            <ButtonGroup>
              {/* <Button appearance="subtle">Cancel</Button> */}
              <Button type="submit" appearance="primary" isLoading={submitting}>
                开始玩游戏
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
)

function checkPhone(phone) {
  return /^1\d{10}$/.test(phone)
}

function saveUserInfo(params) {
  Object.keys(params).forEach(function (key) {
    localStorage.setItem(key, params[key])
  })
}
