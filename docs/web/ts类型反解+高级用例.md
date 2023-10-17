# ts 内置的一些高级类型

## 模版字符串

> 允许在类型定义中使用模版字符串

```ts
type EmailLocaleIDs = "Welcome_email" | "Email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// AllLocaleIDs = "Welcome_email_id" | "Email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

## `Uppercase<StringType>` 将字符串中的每个字符转换为大写版本

```ts
type UppercaseAllLocaleIDs = Uppercase<AllLocaleIDs>;
// "WELCOME_EMAIL_ID" | "EMAIL_HEADING_ID" | "FOOTER_TITLE_ID" | "FOOTER_SENDOFF_ID"
```

## `Lowercase<StringType>` 将字符串中的每个字符转换为等效的小写字符

```ts
type LowercasAllLocaleIDs = Lowercase<UppercaseAllLocaleIDs>;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

## `Capitalize<StringType>` 首字母大写

```ts
type CapitalizeAllLocaleIDs = Capitalize<LowercasAllLocaleIDs>;
// "Welcome_email_id" | "Email_heading_id" | "Footer_title_id" | "Footer_sendoff_id"
```

## `Uncapitalize<StringType>` 首字母小写

```ts
type UncapitalizeAllLocaleIDs = Uncapitalize<CapitalizeAllLocaleIDs>;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

