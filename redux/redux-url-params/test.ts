type ThingToTransform = Record<string, unknown>;

type QueryParamInterpreter<T> = {
  asString: (value: T) => string;
};

type AppStateQueryParams = {
  foo: string;
  bar: boolean;
};

type QueryParamInterpreterMapping<T extends ThingToTransform> = {
  [K in keyof T]: QueryParamInterpreter<T[K]>;
};

const queryParamInterpreterMapping: QueryParamInterpreterMapping<AppStateQueryParams> =
  {
    foo: {
      asString: (value) => value,
    },
    bar: {
      asString: (value) => value.toString(),
    },
  };

export const logStuff = <T extends ThingToTransform>(
  stuff: T,
  mapping: QueryParamInterpreterMapping<T>
) => {
  for (const key in stuff) {
    if (!(key in mapping)) {
      continue;
    }
    const asString = mapping[key].asString;
    const value = stuff[key];
    console.log(asString(value));
  }
};

const exampleStuff: AppStateQueryParams = {
  foo: "hello",
  bar: true,
};

logStuff(exampleStuff, queryParamInterpreterMapping);
