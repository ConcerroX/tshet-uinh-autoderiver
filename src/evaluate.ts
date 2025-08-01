import { 推導方案 } from "tshet-uinh-deriver-tools";

import { Formatter } from "./Classes/CustomElement";
import { tshetUinhTextLabelURLPrefix } from "./consts";
import { type Modification, MODIFICATIONS } from "./modification";
import { evaluateOption, getArticle, setArticle } from "./options";
import { fetchFile, isArray, normalizeFileName, notifyError } from "./utils";

import type { CustomNode, NestedCustomNode } from "./Classes/CustomElement";
import type { MainState, ReactNode } from "./consts";
import type { 音韻地位 } from "tshet-uinh";
import type { 原始推導函數, 推導函數 } from "tshet-uinh-deriver-tools";

type Require = (音韻地位: 音韻地位, 字頭?: string | null) => RequireFunction;
type RequireFunction = (sample: string) => SchemaFromRequire;

type NestedStringNode = string | readonly NestedStringNode[];
type DeriveResult = NestedStringNode | ((formatter: Formatter) => NestedCustomNode);

export function rawDeriverFrom(input: string): 原始推導函數<DeriveResult, [RequireFunction]> {
  return new Function("選項", "音韻地位", "字頭", "require", input) as 原始推導函數<DeriveResult, [RequireFunction]>;
}

function formatResult(result: DeriveResult): CustomNode {
  const node = typeof result === "function" ? result(Formatter) : result;
  return isArray(node) ? Formatter.f(node) : node;
}

export default async function evaluate(state: MainState): Promise<ReactNode> {
  const { schemas, option } = state;

  if (option === "convertPresetArticle" && !getArticle())
    setArticle(await fetchFile(tshetUinhTextLabelURLPrefix + "index.txt"));
  // else if (option === "compareSchemas" && schemas.length < 2) throw notifyError("此選項需要兩個或以上方案");
  else await new Promise(resolve => setTimeout(resolve));

  function getManualPhonetic(char: string | null | undefined, positionDesc: string, orig: string): string | null {
    if (!char) return null;
    const charMap = MODIFICATIONS.get(char);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // MODIFICATIONS.set(char, charMap?.filter(it => it[0] != positionDesc))
    return (charMap?.find(it => it[0] == positionDesc)?.[1] as Modification)?.(orig) || null;
  }

  try {
    const derivers: [derive: 推導函數<DeriveResult, [RequireFunction]>, require: Require][] = schemas.map(
      ({ name, input, parameters }) => {
        const schema = new 推導方案(rawDeriverFrom(input));
        const options = parameters.pack();
        return [schema(options), require(name)];
      },
    );
    return evaluateOption[option](state, (地位, 字頭) =>
      derivers.map(([derive, require]) => {
        const orig = derive(地位, 字頭, require(地位, 字頭));
        const manualReading = getManualPhonetic(字頭, 地位.描述, orig.toString());
        if (manualReading) {
          return formatResult(manualReading);
        }
        // 否则使用原始推导
        return formatResult(orig);
      }),
    );
  } catch (err) {
    throw notifyError("程式碼錯誤", err);
  }

  function require(current: string, references: string[] = []): Require {
    const newReferences = references.concat(current);
    if (references.includes(current)) throw notifyError("Circular reference detected: " + newReferences.join(" -> "));
    return (音韻地位, 字頭) => sample => {
      const schema = schemas.find(({ name }) => name === normalizeFileName(sample));
      if (!schema) throw notifyError("Schema not found");
      return new SchemaFromRequire(rawDeriverFrom(schema.input), require(sample, newReferences), 音韻地位, 字頭);
    };
  }
}

export class SchemaFromRequire {
  private readonly _schema: 推導方案<DeriveResult, [RequireFunction]>;
  constructor(
    rawDeriver: 原始推導函數<DeriveResult, [RequireFunction]>,
    private _require: Require,
    private _音韻地位: 音韻地位,
    private _字頭: string | null = null,
  ) {
    this._schema = new 推導方案(rawDeriver);
  }

  derive(音韻地位: 音韻地位, 字頭: string | null = null, 選項?: Readonly<Record<string, unknown>>) {
    return this._schema(選項)(音韻地位, 字頭, this._require(音韻地位, 字頭));
  }

  deriveThis(選項?: Readonly<Record<string, unknown>>) {
    return this.derive(this._音韻地位, this._字頭, 選項);
  }
}
