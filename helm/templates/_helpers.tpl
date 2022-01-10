{{/*
Common Labels
*/}}
{{- define "connectivity-intake.labels" -}}
app.kubernetes.io/name: {{ .Values.name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
