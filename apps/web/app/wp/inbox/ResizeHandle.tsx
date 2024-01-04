import Box from "@mui/material/Box";
import { PanelResizeHandle } from "react-resizable-panels";

type HandlerProps = {
  className?: string;
  id?: string;
  direction?: "horizontal" | "vertical";
};

// type IconProps = {
//   direction: "horizontal" | "vertical";
// };

// const Icon = ({ direction }: IconProps) => {
//   if (direction === "horizontal") {
//     return (
//       <svg
//         width="20px"
//         height="1.5em"
//         viewBox="0 0 29.957 122.88"
//         enable-background="new 0 0 10 12"
//       >
//         <g>
//           <path
//             fill="red"
//             fill-rule="evenodd"
//             clip-rule="evenodd"
//             d="M14.978,0c8.27,0,14.979,6.708,14.979,14.979c0,8.27-6.709,14.976-14.979,14.976 C6.708,29.954,0,23.249,0,14.979C0,6.708,6.708,0,14.978,0L14.978,0z M14.978,92.926c8.27,0,14.979,6.708,14.979,14.979 s-6.709,14.976-14.979,14.976C6.708,122.88,0,116.175,0,107.904S6.708,92.926,14.978,92.926L14.978,92.926z M14.978,46.463 c8.27,0,14.979,6.708,14.979,14.979s-6.709,14.978-14.979,14.978C6.708,76.419,0,69.712,0,61.441S6.708,46.463,14.978,46.463 L14.978,46.463z"
//           />
//         </g>
//       </svg>
//     );
//   } else {
//     return (
//       <svg
//         width="1.5em"
//         height="20px"
//         viewBox="0 0 122.88 29.957"
//         enable-background="new 0 0 10 12"
//       >
//         <g>
//           <path
//             fill="red"
//             fill-rule="evenodd"
//             clip-rule="evenodd"
//             d="M0,14.979c0-8.27,6.708-14.979,14.978-14.979c8.27,0,14.979,6.709,14.979,14.979 c0,8.27-6.709,14.976-14.979,14.976C6.708,29.954,0,23.249,0,14.979L0,14.979z M92.926,14.979c0-8.27,6.708-14.979,14.979-14.979 s14.979,6.709,14.979,14.979c0,8.27-6.709,14.976-14.979,14.976S92.926,23.249,92.926,14.979L92.926,14.979z M46.463,14.979 c0-8.27,6.708-14.979,14.979-14.979s14.978,6.709,14.978,14.979c0,8.27-6.709,14.976-14.978,14.976S46.463,23.249,46.463,14.979 L46.463,14.979z"
//           />
//         </g>
//       </svg>
//     );
//   }
// };

export default function ResizeHandle({
  className = "",
  id,
  direction = "vertical",
}: HandlerProps) {
  return (
    <Box
      sx={{
        outline: "none",
        position: "relative",
        backgroundColor: "transparent",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderCollapse: "separate",

        fontSize: "1em",
        borderRadius: "0 0.5em 0.5em 0",
        borderRight: "1px solid grey",

        color: "grey",
      }}
    >
      <PanelResizeHandle
        className={className}
        id={id}
        style={{
          outline: "none",
          position: "absolute",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: direction === "horizontal" ? "ew-resize" : "ns-resize",
        }}
      >
        <Box
          component={"span"}
          sx={{
            color: "grey",

            border: "2px solid rgb(231, 231, 231)",
            backgroundColor: "rgb(220, 240, 228)",
            borderRadius: "10px",

            // space between words
            "&:before": {
              content: "'|'",
            },

            "&:hover,:active": {
              color: "black",
              borderRight: "1px solid #2a8af6",
              fontSize: "1.5em",
              border: "1.5px solid orange",
              "&:before": {
                content: "'| | |'",
              },
              transition: "font-size 0.4s ease-in-out",
            },
          }}
        />
      </PanelResizeHandle>
    </Box>
  );
}
