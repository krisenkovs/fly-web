export function Payment() {
  var params = {
    checkout_url: 'https://checkout.bepaid.by',
    checkout: {
      iframe: true,
      test: true,
      transaction_type: 'tokenization',
      public_key:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvextn45qf3NiNzqBYXMvcaSFlgoYE/LDuDDHtNNM4iWJP7BvjBkPcZu9zAfo5IiMxl660r+1E4PYWwr0iKSQ8+7C/WcSYwP8WlQVZH+2KtPmJgkPcBovz3/aZrQpj6krcKLklihg3Vs++TtXAbpCCbhIq0DJ3T+khttBqTGD+2x2vOC68xPgMwvnwQinfhaHEQNbtEcWWXPw9LYuOTuCwKlqijAEds4LgKSisubqrkRw/HbAKVfa659l5DJ8QuXctjp3Ic+7P2TC+d+rcfylxKw9c61ykHS1ggI/N+/KmEDVJv1wHvdy7dnT0D/PhArnCB37ZDAYErv/NMADz2/LuQIDAQAB',
      order: {
        amount: 1,
        currency: 'BYN',
        description: 'Привязка карты',
        tracking_id: 'my_transaction_id'
      },
      settings: {
        save_card_toggle: {
          display: false,
        },
        another_card_toggle: {
          display: false,
        },
        return_url: 'https://localhost:8000',
        success_url: 'https://localhost:8000',
        button_text: 'Привязать карту',
        language: 'ru',
      },
      payment_method: {
        types: ['credit_card'],
      },
    },
    closeWidget: function (status: unknown) {
      // возможные значения status
      // successful - операция успешна
      // failed - операция не успешна
      // pending - ожидаем результат/подтверждение операции
      // redirected - пользователь отправлен на внешнюю платежную систему
      // error - ошибка (в параметрах/сети и тд)
      // null - виджет закрыли без запуска оплаты
      console.debug('close widget callback');
    },
  };

  // @ts-ignore
  new BeGateway(params).createWidget();
}
