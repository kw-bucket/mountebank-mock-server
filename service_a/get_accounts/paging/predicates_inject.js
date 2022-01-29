function f(config) {
    let correlation_id = request.headers['x-correlation-id'];

    return /mock-paging(-fail)?/.test(correlation_id)
}
