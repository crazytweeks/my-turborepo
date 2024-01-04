const gitHost = "https://raw.githubusercontent.com";

type Props = {
  gitHost?: string;
  user: string;
  repo: string;
  branch: string;
  filename: string;
};

const createGitRawLink = ({
  branch,
  filename,
  repo,
  user,
  gitHost: gh,
}: Props) => `${gh ?? gitHost}/${user}/${repo}/${branch}/${filename}`;

const getGitRawFile = (filePath: string | Props, parse: boolean = false) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const url = new URL(
        typeof filePath === "string" ? filePath : createGitRawLink(filePath),
      );

      fetch(url)
        .then((response) => response.text())
        .then((text) => resolve(parse ? JSON.parse(text) : text));
    } catch (error) {
      reject(error);
    }
  });
};

export default getGitRawFile;
export { createGitRawLink };
