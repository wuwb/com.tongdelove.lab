import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import BaseCard from "@/components/module/baseCard/BaseCard";

const activities = [
  {
    time: "09.50",
    color: "success.main",
    text: "Meeting with John",
  },
  {
    time: "09.46",
    color: "secondary.main",
    text: "Payment received from John Doe of $385.90",
  },
  {
    time: "09.47",
    color: "primary.main",
    text: "Project Meeting",
  },
  {
    time: "09.48",
    color: "warning.main",
    text: "New Sale recorded #ML-3467",
  },
  {
    time: "09.49",
    color: "error.main",
    text: "Payment was made of $64.95 to Michael Anderson",
  },
];

const DailyActivity = () => {
  return (
    <BaseCard title="Daily Activity">
      <Timeline slot={undefined} style={undefined} title={undefined} hidden={undefined} defaultChecked={undefined} defaultValue={undefined} suppressContentEditableWarning={undefined} suppressHydrationWarning={undefined} accessKey={undefined} contentEditable={undefined} contextMenu={undefined} dir={undefined} draggable={undefined} id={undefined} lang={undefined} placeholder={undefined} spellCheck={undefined} tabIndex={undefined} translate={undefined} radioGroup={undefined} role={undefined} about={undefined} datatype={undefined} inlist={undefined} prefix={undefined} property={undefined} resource={undefined} typeof={undefined} vocab={undefined} autoCapitalize={undefined} autoCorrect={undefined} autoSave={undefined} color={undefined} itemProp={undefined} itemScope={undefined} itemType={undefined} itemID={undefined} itemRef={undefined} results={undefined} security={undefined} unselectable={undefined} inputMode={undefined} is={undefined} aria-activedescendant={undefined} aria-atomic={undefined} aria-autocomplete={undefined} aria-busy={undefined} aria-checked={undefined} aria-colcount={undefined} aria-colindex={undefined} aria-colspan={undefined} aria-controls={undefined} aria-current={undefined} aria-describedby={undefined} aria-details={undefined} aria-disabled={undefined} aria-dropeffect={undefined} aria-errormessage={undefined} aria-expanded={undefined} aria-flowto={undefined} aria-grabbed={undefined} aria-haspopup={undefined} aria-hidden={undefined} aria-invalid={undefined} aria-keyshortcuts={undefined} aria-label={undefined} aria-labelledby={undefined} aria-level={undefined} aria-live={undefined} aria-modal={undefined} aria-multiline={undefined} aria-multiselectable={undefined} aria-orientation={undefined} aria-owns={undefined} aria-placeholder={undefined} aria-posinset={undefined} aria-pressed={undefined} aria-readonly={undefined} aria-relevant={undefined} aria-required={undefined} aria-roledescription={undefined} aria-rowcount={undefined} aria-rowindex={undefined} aria-rowspan={undefined} aria-selected={undefined} aria-setsize={undefined} aria-sort={undefined} aria-valuemax={undefined} aria-valuemin={undefined} aria-valuenow={undefined} aria-valuetext={undefined} dangerouslySetInnerHTML={undefined} onCopy={undefined} onCopyCapture={undefined} onCut={undefined} onCutCapture={undefined} onPaste={undefined} onPasteCapture={undefined} onCompositionEnd={undefined} onCompositionEndCapture={undefined} onCompositionStart={undefined} onCompositionStartCapture={undefined} onCompositionUpdate={undefined} onCompositionUpdateCapture={undefined} onFocus={undefined} onFocusCapture={undefined} onBlur={undefined} onBlurCapture={undefined} onChange={undefined} onChangeCapture={undefined} onBeforeInput={undefined} onBeforeInputCapture={undefined} onInput={undefined} onInputCapture={undefined} onReset={undefined} onResetCapture={undefined} onSubmit={undefined} onSubmitCapture={undefined} onInvalid={undefined} onInvalidCapture={undefined} onLoad={undefined} onLoadCapture={undefined} onError={undefined} onErrorCapture={undefined} onKeyDown={undefined} onKeyDownCapture={undefined} onKeyPress={undefined} onKeyPressCapture={undefined} onKeyUp={undefined} onKeyUpCapture={undefined} onAbort={undefined} onAbortCapture={undefined} onCanPlay={undefined} onCanPlayCapture={undefined} onCanPlayThrough={undefined} onCanPlayThroughCapture={undefined} onDurationChange={undefined} onDurationChangeCapture={undefined} onEmptied={undefined} onEmptiedCapture={undefined} onEncrypted={undefined} onEncryptedCapture={undefined} onEnded={undefined} onEndedCapture={undefined} onLoadedData={undefined} onLoadedDataCapture={undefined} onLoadedMetadata={undefined} onLoadedMetadataCapture={undefined} onLoadStart={undefined} onLoadStartCapture={undefined} onPause={undefined} onPauseCapture={undefined} onPlay={undefined} onPlayCapture={undefined} onPlaying={undefined} onPlayingCapture={undefined} onProgress={undefined} onProgressCapture={undefined} onRateChange={undefined} onRateChangeCapture={undefined} onSeeked={undefined} onSeekedCapture={undefined} onSeeking={undefined} onSeekingCapture={undefined} onStalled={undefined} onStalledCapture={undefined} onSuspend={undefined} onSuspendCapture={undefined} onTimeUpdate={undefined} onTimeUpdateCapture={undefined} onVolumeChange={undefined} onVolumeChangeCapture={undefined} onWaiting={undefined} onWaitingCapture={undefined} onAuxClick={undefined} onAuxClickCapture={undefined} onClick={undefined} onClickCapture={undefined} onContextMenu={undefined} onContextMenuCapture={undefined} onDoubleClick={undefined} onDoubleClickCapture={undefined} onDrag={undefined} onDragCapture={undefined} onDragEnd={undefined} onDragEndCapture={undefined} onDragEnter={undefined} onDragEnterCapture={undefined} onDragExit={undefined} onDragExitCapture={undefined} onDragLeave={undefined} onDragLeaveCapture={undefined} onDragOver={undefined} onDragOverCapture={undefined} onDragStart={undefined} onDragStartCapture={undefined} onDrop={undefined} onDropCapture={undefined} onMouseDown={undefined} onMouseDownCapture={undefined} onMouseEnter={undefined} onMouseLeave={undefined} onMouseMove={undefined} onMouseMoveCapture={undefined} onMouseOut={undefined} onMouseOutCapture={undefined} onMouseOver={undefined} onMouseOverCapture={undefined} onMouseUp={undefined} onMouseUpCapture={undefined} onSelect={undefined} onSelectCapture={undefined} onTouchCancel={undefined} onTouchCancelCapture={undefined} onTouchEnd={undefined} onTouchEndCapture={undefined} onTouchMove={undefined} onTouchMoveCapture={undefined} onTouchStart={undefined} onTouchStartCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerOver={undefined} onPointerOverCapture={undefined} onPointerOut={undefined} onPointerOutCapture={undefined} onGotPointerCapture={undefined} onGotPointerCaptureCapture={undefined} onLostPointerCapture={undefined} onLostPointerCaptureCapture={undefined} onScroll={undefined} onScrollCapture={undefined} onWheel={undefined} onWheelCapture={undefined} onAnimationStart={undefined} onAnimationStartCapture={undefined} onAnimationEnd={undefined} onAnimationEndCapture={undefined} onAnimationIteration={undefined} onAnimationIterationCapture={undefined} onTransitionEnd={undefined} onTransitionEndCapture={undefined}>
        {activities.map((activity) => (
          <TimelineItem key={activity.time}>
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {activity.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  borderColor: activity.color,
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              {activity.text}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </BaseCard>
  );
};

export default DailyActivity;
