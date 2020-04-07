const sum = require('./sum')
test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('object', () => {
  const obj = { name: 'foo', age: 12, height: null }
  expect(obj).toEqual({ name: 'foo', age: 12 })
})
