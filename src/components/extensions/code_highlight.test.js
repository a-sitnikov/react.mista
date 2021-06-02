import highlight from './code_highlight'

describe('Code highlight', () => {

  it('+++test 1', () => {

    const text = highlight(
      '// Комментарий\n' +
      'Процедура Тест()\n' +
      '  а = 1;\n' +
      'КонецПроцедуры\n'
    );

    expect({ text }).toMatchSnapshot();

  })

  it('+++test 2', () => {

    const text = highlight(
      'd = "\n' +
      '| dfsf\n' +
      '| dsgffsg";'
    );

    expect({ text }).toMatchSnapshot();

  })
});