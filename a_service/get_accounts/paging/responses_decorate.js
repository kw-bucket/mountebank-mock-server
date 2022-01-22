function f(config) {
    let correlation_id = config.request.headers['x-correlation-id']

    let product = config.request.query.product_code
    let offset = config.request.query.offset
    let size = config.request.query.size

    let fail = correlation_id.includes('paging_fail')

    const case_decoration = {
        'PRODUCT-A': {
            TC_001: { body: 'TC_001.json' },
            TC_002: { body: 'TC_002.json' },
            TC_003: { body: 'TC_003.json' },
            TC_00F: { body: '/default/_failed.json', status: 501 },
            '0_50': { body: '/default/0_50.json' },
            '50_50': {
                body: fail ? '/default/_failed.json' : '/default/50_50.json',
                status: fail ? 501 : 200
            }
        },
        'PRODUCT-B': {
            TC_001: { body: 'TC_0001.json' },
            TC_002: { body: 'TC_0002.json' },
            TC_003: { body: 'TC_0003.json' },
            TC_00F: { body: '/default/_failed.json', status: 503},
            TC_Empty: { body: '/default/_empty.json' },
            '0_50': { body: '/default/0_50.json' },
            '50_50': { body: '/default/50_50.json' },
            '100_50': {
                body: fail ? '/default/_failed.json' : '/default/100_50.json',
                status: fail ? 501 : 200
            },
        }
    }

    let case_no = correlation_id.split('-')[0]
    let decorator = case_decoration[product][case_no] || case_decoration[product][`${offset}_${size}`]

    let home = '.'
    let response_directory = '/a_service/get_accounts/paging/responses'
    let filename = decorator['body']

    const path = require('path')
    let json_path = path.join(home, response_directory, product, filename)

    const fs = require('fs')
    let json = fs.readFileSync(json_path, 'utf-8')
    let body = JSON.parse(json)

    config.response.statusCode = decorator['status'] || 200
    config.response.body = body
}
