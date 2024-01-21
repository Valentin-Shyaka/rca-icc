import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'rca-icc',
    title: 'RCA interclass competitions CMS',
    projectId: 'lxeru4rg',
    dataset: 'production',
    plugins: [
        structureTool(),
    ],
    schema: {
        types: schemaTypes,
    },
})