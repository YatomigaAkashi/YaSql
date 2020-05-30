const PeekIterator = require('../../src/common/PeekIterator')
const arrayToGenerator = require('../../src/common/arrayToGenerator')

describe('test PeekIterator', () => {
    it('test peek', () => {
        const it = new PeekIterator(arrayToGenerator([...'abcdefg']))
        expect(it.next()).toBe('a')
        expect(it.next()).toBe('b')
        expect(it.peek()).toBe('c')
        expect(it.peek()).toBe('c')
        expect(it.next()).toBe('c')
        expect(it.next()).toBe('d')
    })
    
    it('test lookhead2', () => {
        const it = new PeekIterator(arrayToGenerator([...'abcdefg']))
        expect(it.next()).toBe('a')
        expect(it.peek()).toBe('b')
        expect(it.peek()).toBe('b')
        expect(it.next()).toBe('b')
        expect(it.next()).toBe('c')
        it.putBack()
        it.putBack()
        expect(it.next()).toBe('b')
        expect(it.next()).toBe('c')
        expect(it.next()).toBe('d')
    })
    
    it('test endToken', () => {
        const it = new PeekIterator(arrayToGenerator([...'abcdefg']), '\0')
        for (let i = 0; i < 8; i++) {
            if (i === 7) {
                expect(it.next()).toBe('\0')
            } else {
                expect(it.next()).toBe('abcdefg'[i])
            }
        }
    })
})
