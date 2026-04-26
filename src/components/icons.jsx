import {
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Code,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FolderGit2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  User,
} from "lucide-react";

export const icons = {
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Code,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FolderGit2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  User,
};

export function Icon({ name, className = "size-4", ...props }) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component className={`lucide-icon shrink-0 ${className}`} strokeWidth={1.75} aria-hidden="true" {...props} />;
}
