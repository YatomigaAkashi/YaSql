const Token = require('../../src/lexer/Token')
const TokenType = require('../../src/lexer/TokenType')
const PeekIterator = require('../../src/common/PeekIterator')
const arrayToGenerator = require('../../src/common/arrayToGenerator')

describe('Token', () => {
    
    function expectToken(token, type, value) {
        expect(token.getType()).toBe(type)
        expect(token.getValue()).toBe(value)
    }
    
    it('makeVarOrKeyword', () => {
        let it1 = new PeekIterator(arrayToGenerator('if abc'))
        let it2 = new PeekIterator(arrayToGenerator('true abc'))
        
        let token1 = Token.makeVarOrKeyword(it1)
        let token2 = Token.makeVarOrKeyword(it2)
        it1.next()
        let token3 = Token.makeVarOrKeyword(it1)
        
        expectToken(token1, TokenType.KEYWORD, 'if')
        expectToken(token2, TokenType.BOOLEAN, 'true')
        expectToken(token3, TokenType.VARIABLE, 'abc')
    })
    
    it('makeString', () => {
        const tests = ["'123'", '"123"']
        
        for (let test of tests) {
            let it = new PeekIterator(arrayToGenerator([...test]))
            let token = Token.makeString(it)
            expectToken(token, TokenType.STRING, test)
        }
    })
    
    it("makeOp", () => {
        const tests = [
            ["+ xxx", "+"],
            ["++mmm", "++"],
            ["/=g", "/="],
            ["==1", "=="],
            ["&=3982", "&="],
            ["&777", "&"],
            ["||xx", "||"],
            ["^=111", "^="],
            ["%7", "%"],
        ]
        
        for(let test of tests) {
            const [input, expected] = test
            const it = new PeekIterator(arrayToGenerator([...input]))
            const token = Token.makeOp(it)
            expectToken(token, TokenType.OPERATOR, expected)
        }
    })
    
    it("makeNumber", () => {
        const tests = [
            "+0 aa",
            "-0 bbb",
            ".3 ccc",
            ".5555 ddd",
            "7899.999 aaa",
            "-100 ggg",
            "-1000.5345345*123123",
            "012 aaa"
        ]
        
        for(let test of tests) {
            const it = new PeekIterator(arrayToGenerator([...test]))
            const token = Token.makeNumber(it)
            const [expected] = test.split(/[ *]/);
            const type = test.indexOf('.') === -1 ? TokenType.INTEGER : TokenType.FLOAT
            expectToken(token, type, expected)
        }
    })
})
