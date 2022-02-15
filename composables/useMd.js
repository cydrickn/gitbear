import MarkdownIt from 'markdown-it';
const md = MarkdownIt();

export const useMd = (string) => {
    const result = md.render(string);

    return result;
};