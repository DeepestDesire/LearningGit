import React, { Fragment } from 'react'
import TextField from '@atlaskit/textfield'
import Button, { ButtonGroup } from '@atlaskit/button'
import { Checkbox } from '@atlaskit/checkbox'
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form'

export default () => (
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
        return new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
          data.username === 'error' ? { username: 'IN_USE' } : undefined
        )
      }}
    >
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Field name="username" label="姓名" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
                {!error && (
                  <HelperMessage>
                    You can use letters, numbers & periods.
                  </HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>
                )}
              </Fragment>
            )}
          </Field>
          <Field
            name="password"
            label="手机号"
            defaultValue=""
            isRequired
            validate={value =>
              value && value.length < 8 ? 'TOO_SHORT' : undefined
            }
          >
            {({ fieldProps, error, valid, meta }) => (
              <Fragment>
                <TextField type="password" {...fieldProps} />
                {!error && !valid && (
                  <HelperMessage>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    Password needs to be more than 8 characters.
                  </ErrorMessage>
                )}
                {valid && meta.dirty ? (
                  <ValidMessage>Awesome password!</ValidMessage>
                ) : null}
              </Fragment>
            )}
          </Field>
          <CheckboxField name="remember" label="Remember me" defaultIsChecked>
            {({ fieldProps }) => (
              <Checkbox {...fieldProps} label="Always sign in on this device" />
            )}
          </CheckboxField>
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
