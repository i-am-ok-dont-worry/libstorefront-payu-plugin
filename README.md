
![Payu](https://poland.payu.com/wp-content/uploads/sites/14/2020/06/PAYU_LOGO_LIME_photo.jpg)
## LSF Payu Plugin
This plugin provides support for PayU one click payments.
PayU plugin appends new state branch to the LSF redux store:
```js
{
    ...
    payu: {
        form: PayuForm,
        url: string,
        status: PayuStatus
    }   
}
```

## PayU service
PayU service exposes methods for handling payu payment:
```js
getPayuPaymentForm (orderId: string): Promise<PayuResponse>
getPayuPaymentStatus (orderId: string): Promise<PayuStatus>
sendPayuForm (): Promise<Task>
```

## Local storage
PayU plugin stores last successfully fetched payment form object
in key `last_payu_payment`

## Test plugin
Plugin must be tested in isolation. Unit tests can be performed via jest framework
in `/tests/test.ts` file.
Template includes by default mocked LocalStorage object.
