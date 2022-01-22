function f(config) {
    let correlation_id = request.headers['x-correlation-id'];

    return new RegExp('mock_paging(_fail){0,1}').test(correlation_id)
}
