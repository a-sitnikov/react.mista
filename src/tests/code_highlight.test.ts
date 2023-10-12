import highlight from "src/components/extensions/code_highlight";

describe("Code highlight", () => {
  it("Процедура с комментарием", () => {
    const text = highlight(
      "// Комментарий\n" +
        "Процедура Тест()\n" +
        "  а = 1;\n" +
        "КонецПроцедуры\n"
    );

    expect(text).toMatchSnapshot();
  });

  it("Многострочный литерал", () => {
    const text = highlight('d = "\n' + "| dfsf\n" + '| dsgffsg";');

    expect(text).toMatchSnapshot();
  });
});
