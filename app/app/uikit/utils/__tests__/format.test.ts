import { describe, expect, it } from "vitest";
import {formatInitialUserName, formatToCapitalize, formatToStringWithPx} from "@/app/uikit/utils";

describe("app.uikit.utils.format", () => {
  it("should add 'px' to number value", () => {
    expect(formatToStringWithPx(10)).toEqual("10px");
  });

  it("should add 'px' to string value", () => {
    expect(formatToStringWithPx("10")).toEqual("10px");
  });

  it("should capitalize first letter of string", () => {
    expect(formatToCapitalize("hello")).toEqual("Hello");
  });

  it("should return capitalized first letter", () => {
    expect(formatInitialUserName("john")).toEqual("J");
  });
});