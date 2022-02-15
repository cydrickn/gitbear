const types = [
    { pattern: /\.dockerignore|Dockerfile|docker-compose\.yaml|docker-compose\.yml/, icon: 'fa-brands fa-docker text-sky-500' },
    { pattern: /.*\.js|ts/, icon: 'fa-brands fa-js-square text-yellow-500' },
    { pattern: /\.gitignore/, icon: 'fa-brands fa-git-alt text-red-500' },
    { pattern: /.*\.vue/, icon: 'fa-brands fa-vuejs text-green-500' },
    { pattern: /.*\.md/, icon: 'fa-brands fa-markdown text-blue-400' },
    { pattern: /.*\.css|sass|scss/, icon: 'fa-brands fa-css3 text-blue-800' },
];
const defaultIcons = {
    tree: 'fa-regular fa-folder text-accent',
    blob: 'fa-solid fa-file text-accent',
};

export const useGetFileType = (file) => {
    if (file.type === 'tree') {
        return { type: file.type, icon:  defaultIcons[file.type] };
    }

    const type = types.find(type => {
        return type.pattern.test(file.name);
    });

    if (!type) {
        return { type: file.type, icon:  defaultIcons[file.type] };
    }

    return type;
}