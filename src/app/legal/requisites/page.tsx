export default function RequisitesPage() {
  return (
    <div className="min-h-screen bg-teal-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Реквизиты</h1>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 space-y-4 text-sm text-gray-800">
            <div>
              <div className="text-gray-500">Юридическое лицо</div>
              <div className="font-medium">ИП Золочевская Дарья Николаевна</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500">ИНН</div>
                <div className="font-mono">432403568907</div>
              </div>
              <div>
                <div className="text-gray-500">ОГРНИП</div>
                <div className="font-mono">325774600435896</div>
              </div>
            </div>

            <div>
              <div className="text-gray-500">Адрес государственной регистрации</div>
              <div>119297, Россия, г. Москва, ул. Родниковая, д. 30, корп. 2, кв. 526</div>
            </div>

            <div>
              <div className="text-gray-500">Почтовый адрес</div>
              <div>119297, Россия, г. Москва, ул. Родниковая, д. 30, корп. 2, кв. 526</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500">Р/с</div>
                <div className="font-mono break-all">40802810500008460611</div>
              </div>
              <div>
                <div className="text-gray-500">Банк</div>
                <div>АО «ТБанк»</div>
              </div>
              <div>
                <div className="text-gray-500">К/с</div>
                <div className="font-mono break-all">30101810145250000974</div>
              </div>
              <div>
                <div className="text-gray-500">БИК</div>
                <div className="font-mono">044525974</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500">Телефон</div>
                <div className="font-mono">+7 980 152-08-65</div>
              </div>
              <div>
                <div className="text-gray-500">E-mail</div>
                <div className="font-mono break-all">harmonycentr@yandex.ru</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">Страница с реквизитами доступна без авторизации.</p>
      </div>
    </div>
  );
}




