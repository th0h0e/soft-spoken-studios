This is a Project using the Vue framwork Nuxt 4.



We use Nuxt Ui for our interface and components and the Nuxt Content module to query / fetch data. 


### Core Concepts of Nuxt UI

## Component Architecture

  Slots-Based Structure
  - Components are composed of multiple slots (distinct HTML sections)
  - Example: UCard has root, header, body, and footer slots
  - Simple components may only have a base slot (like UContainer)

  Variants System
  - Props like size, color, variant dynamically control component styling
  - Each variant can affect different slots
  - defaultVariants set the defaults when no prop is provided
  - compoundVariants apply styles when multiple conditions are met

## Semantic Color System

  Instead of using Tailwind colors, Nuxt UI uses semantic colors:
  - primary - Main CTAs, active states, brand elements
  - secondary - Alternative actions
  - success, info, warning, error - Status-based colors
  - neutral - Text, borders, backgrounds

  These map to actual Tailwind colors (like green, blue, red) configured in app.config.ts

<note>

Information regarding Nuxt UI please use the Nuxt UI MCP to look into the documentation.)

</note>



### Core Concepts of Nuxt Content

Our data is stored in .md and .yml files within the @app/content folder. 

The Nuxt Content module allows us to query and import this data in pages and components.

Nuxt content requires us to build a clear stucture/ for our data in content.config.ts that we can then validate with Zod.


The structure of the data is defined in @content.config.ts:
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

content.config.ts defines what kind of collections we have:
defineCollection({

content.config.ts defines where the source of data is :
source: 'index.yml'

Then it defines a type. this can either be one of two options:
type: 'page'
type: 'data'

content.config.ts also  defines the structure:
 schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        image: z.object({
          src: property(z.string()).editor({ input: 'media' }),
          alt: z.string()

In order to use the data in .md fieles Nuxt gives us clear insructions of how to use Nuxt Content. 






### Define a Collection

```ts [content.config.ts]
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string()
      })
    })
  }
})
```



### Create `.md` files

Create blog posts in `content/blog/` directory.

<code-group>

```md [foo.md]
---
date: 2020-11-11
---

# Foo

This is Foo blog post.
```

```md [bar.md]
---
date: 2024-12-12
---
Hello
I am bar. Nice to meet you.
```

</code-group>

### Query Markdown Files

Now we can query blog posts:

```ts
// Get the foo post
const fooPost = await queryCollection('blog').path('/blog/foo').first()

// Find all posts
const allPosts = await queryCollection('blog').order('date', 'DESC').all()
```

### Display Markdown

To display the content of a markdown file, you can use the [`<ContentRenderer>`](/docs/components/content-renderer) component.

```vue [blog/[slug].vue]
<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>
```


## Frontmatter

Frontmatter is a convention of Markdown-based CMS to provide meta-data to pages, like description or title. In Nuxt Content, the frontmatter uses the YAML syntax with `key: value` pairs.

These data are available when rendering the content and can store any information that you would need.

### Syntax

You can declare a frontmatter block at the top of the Markdown files in the `content/` directory with the `---` identifier.

```md [content/index.md]
---
title: 'Title of the page'
description: 'meta description of the page'
---

<!-- Content of the page -->
```

```ts [example.ts]
const home = await queryCollection('content').path('/').first()

console.log(home.title)
// => 'Title of the page'
console.log(home.description)
// => 'meta description of the page'
console.log(home.body)
// => AST object of the page content
```

### Native parameters

<table>
<thead>
  <tr>
    <th>
      
    </th>
    
    <th>
      
    </th>
    
    <th>
      
    </th>
    
    <th>
      
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Key
    </td>
    
    <td>
      Type
    </td>
    
    <td>
      Default
    </td>
    
    <td>
      Description
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        title
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      First <code>
        <h1>
      </code>
      
       of the page
    </td>
    
    <td>
      Title of the page, will also be injected in metas
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      First <code>
        <p>
      </code>
      
       of the page
    </td>
    
    <td>
      Description of the page, will be shown below the title and injected into the metas
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        navigation
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Define if the page is included in <a href="/docs/utils/query-collection-navigation">
        <code>
          queryCollectionNavigation
        </code>
      </a>
      
       return value.
    </td>
  </tr>
</tbody>
</table>



Additional parameters that you have defined in your frontmatter block need to be defined in your schema (see the date parameter in the example at top of this page) to be able to use them for querying.


### Vue Components

You can use any Vue component in your Markdown files.

We have a special syntax to make it easier to use components in your Markdown files.

```mdc [content/index.md]
::component-name
Default slot content
::
```

<warning>

Components that are used in Markdown has to be marked as `global` in your Nuxt app if you don't use the `components/content/` directory, visit (https://nuxt.com/docs/guide/directory-structure/components) to learn more about it.

</warning>


#### Block Components

Block components are components that accept Markdown content or another component as a slot.

The component must contain at least one `<slot />` component to accept formatted text.

In a markdown file, use the component with the `::` identifier.

<code-group>

```mdc [index.md]
::card
The content of the card
::
```

```html [Card.vue]
<!-- components/content/Card.vue -->
<template>
  <div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <slot />
  </div>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-card>

The content of the card

</example-card>
</code-preview>
</code-group>

#### Slots

A component's slots can accept content or another components.

- **Default slot** renders the top-level content inside the block component or with `#default`
- **Named slots** use the `#` identifier to render the corresponding content.

<code-group>

```mdc [index.md]
::hero
My Page Title

#description
This will be rendered inside the `description` slot.
::
```

```html [Hero.vue]
<template>
  <section>
    <h1 class="text-4xl">
      <slot mdc-unwrap="p" />
    </h1>
    <slot name="description" />
  </section>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-hero>

My Page Title<template v-slot:description="">

This will be rendered inside the `description` slot.

</template>
</example-hero>
</code-preview>
</code-group>

<note>

Read more about the [`<slot />`](/docs/components/slot) component.

</note>

<tip>

You can use Markdown inside your components slots:

<code-group>

```mdc [index.md]
::my-title
A [rich text](/) will be **rendered** by the component.
::
```

```html [MyTitle.vue]
<template>
  <h1 class="text-4xl">
    <slot mdc-unwrap="p" />
  </h1>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-title>

A [rich text](/) will be **rendered** by the component.

</example-title>
</code-preview>
</code-group>
</tip>

#### Props

There are two ways to pass props to components using MDC.

##### **Inline method**

The `{}` identifier passes props to components in a terse way by using a `key=value` syntax.

<code-group>

```mdc [index.md]
::alert{type="warning"}
The **alert** component.
::
```

```vue [Alert.vue]
<script setup>
const props = defineProps({ type: { type: String } })

const alertClass = computed(() => {
  return {
    warning: 'bg-orange-100 border-orange-200 dark:bg-orange-900 dark:border-orange-800',
    info: 'bg-blue-100 border-blue-200 dark:bg-blue-900 dark:border-blue-800',
    success: 'bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-800',
  }[props.type]
})
</script>

<template>
  <div
    class="text-black p-2 border dark:text-white rounded"
    :class="alertClass"
  >
    <slot mdc-unwrap="p" />
  </div>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-alert type="warning">

The **alert** component.

</example-alert>
</code-preview>
</code-group>

Multiple props can be separated with a space:

```mdc
::alert{type="warning" icon="exclamation-circle"}
Oops! An error occurred
::
```

The `v-bind` shorthand `:` can be also be used to bind a prop to a value in the frontmatter.

```mdc
---
type: "warning"
---

::alert{:type="type"}
Your warning
::
```

If you want to pass arrays or objects as props to components you can pass them as JSON string and prefix the prop key with a colon to automatically decode the JSON string. Note that in this case you should use single quotes for the value string so you can use double quotes to pass a valid JSON string:

<code-group>

```mdc [array.md]
::dropdown{:items='["Nuxt", "Vue", "React"]'}
::
```

```mdc [number-array.md]
::dropdown{:items='[1,2,3.5]'}
::
```

```mdc [object.md]
::chart{:options='{"responsive": true, "scales": {"y": {"beginAtZero": true}}}'}
::
```

</code-group>

##### **YAML method**

The YAML method uses the `---` identifier to declare one prop per line, that can be useful for readability.

<code-group>

```mdc [index.md]
::icon-card
---
icon: IconNuxt
description: Harness the full power of Nuxt and the Nuxt ecosystem.
title: Nuxt Architecture.
---
::
```

```html [IconCard.vue]
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Default title'
  },
  description: {
    type: String,
    default: 'Default description'
  },
  icon: {
    type: String,
    default: 'IconMarkdown'
  }
})
</script>

<template>
  <div class="p-6 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <component :is="icon" class="w-20 h-20" />
    <h2 class="text-3xl font-semibold mb-2">
      {{ title }}
    </h2>
    <p>{{ description }}</p>
  </div>
</template>
```

<code-preview label="Preview" icon="i-lucide-eye">
<example-icon-card description="Harness the full power of Nuxt and the Nuxt ecosystem." icon="i-simple-icons-nuxtdotjs" title="Nuxt Architecture.">



</example-icon-card>
</code-preview>
</code-group>



### Attributes

Attributes are useful for highlighting and modifying part of paragraph. The syntax is nearly similar to inline components and markdown links syntax.

Possible values are all named attributes, classes with the notation `.class-name` and an ID with `#id-name`.

<code-group>

```mdc [index.md]
Hello [World]{style="color: green;" .custom-class #custom-id}!
```

<code-preview label="Preview" icon="i-lucide-eye">

Hello <span className="custom-class" id="custom-id" style="color: green;">

World

</span>

 !

</code-preview>
</code-group>

In addition to mdc components and `span`, attribute syntax will work on images, links, inline `code`, **bold** and _italic_ text.

<code-group>

```md [index.md]
Attributes work on:

- [link](#attributes){style="background-color: green;"}, `code`{style="color: cyan;"},
- _italic_{style="background-color: yellow; color:black;"} and **bold**{style="background-color: lightgreen;"} texts.
```

<code-preview label="Preview" :prose="true" prose="">

Attributes work on:

- [link](#attributes), `code`,
- *italic* and **bold** texts.

</code-preview>
</code-group>

### Binding Data

You can bind data within your Markdown document using the `{{ $doc.variable || 'defaultValue' }}` syntax. These values can be defined in the YAML frontmatter at the top of the document, within each MDC component, or injected using the `data` prop of the `<ContentRenderer>` component.

#### Define in YAML

```mdc
---
title: 'Title of the page'
description: 'meta description of the page'
customVariable: 'Custom Value'
---

# The Title is {{ $doc.title }} and customVariable is {{ $doc.customVariable || 'defaultValue' }}
```

#### Define in external with `<ContentRenderer>`

```html [test.vue]
<template>
  <div>
    <ContentRenderer :value="data" :data="mdcVars"/>
    <button type="button" v-on:click="mdcVars.name = 'Hugo'">Change name</button>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content').path('/test').first());
const mdcVars = ref({ name: 'Maxime'});
</script>
```

```mdc [test.md]
# Hello {{ $doc.name || 'World' }}
```


## Images

You can add images to your `public` directory:

```bash [Directory structure]
content/
  index.md
public/
  image.png
nuxt.config.ts
package.json
```

And then use them in your markdown files in the `content` directory as such:

```md [content/index.md]
![my image](/image.png)
```