const Lexer = require('../../src/lexer/Lexer')
const TokenType = require('../../src/lexer/TokenType')
const arrayToGenerator = require('../../src/common/arrayToGenerator')

describe('Lexer', () => {
    
    function expectToken(token, value, type) {
        expect(token.getType()).toBe(type)
        expect(token.getValue()).toBe(value)
    }
    
    it('expression', () => {
        const source = 'CREATE TABLE STUDENT(SNAME CHAR(20),SAGE INT,SSEX INT);'
        const lexer = new Lexer()
        const tokens = lexer.analyse(arrayToGenerator([...source]))
        expect(tokens.length).toBe(17)
        
        expectToken(tokens[0], 'create', TokenType.KEYWORD)
        expectToken(tokens[1], "table", TokenType.KEYWORD)
        expectToken(tokens[2], "STUDENT", TokenType.VARIABLE)
        expectToken(tokens[3], "(", TokenType.BRACKET)
        expectToken(tokens[4], "SNAME", TokenType.VARIABLE)
        expectToken(tokens[5], "char", TokenType.KEYWORD)
        expectToken(tokens[6], "(", TokenType.BRACKET)
        expectToken(tokens[7], "20", TokenType.INTEGER)
        expectToken(tokens[8], ")", TokenType.BRACKET)
        expectToken(tokens[9], ",", TokenType.BRACKET)
        expectToken(tokens[10], "SAGE", TokenType.VARIABLE)
        expectToken(tokens[11], "int", TokenType.KEYWORD)
        expectToken(tokens[12], ",", TokenType.BRACKET)
        expectToken(tokens[13], "SSEX", TokenType.VARIABLE)
        expectToken(tokens[14], "int", TokenType.KEYWORD)
        expectToken(tokens[15], ")", TokenType.BRACKET)
        expectToken(tokens[16], ";", TokenType.BRACKET)
    })
})
