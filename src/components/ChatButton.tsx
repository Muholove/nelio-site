import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import TelegramIcon from '@mui/icons-material/Telegram';
import MessageIcon from '@mui/icons-material/Message';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface ChatButtonProps {
  telegramUrl?: string;
  zangiUrl?: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  sx?: any;
}

const ChatButton: FC<ChatButtonProps> = ({ 
  telegramUrl, 
  zangiUrl = 'https://services.zangi.com/dl/conversation/5222074953',
  variant = 'outlined',
  size = 'medium',
  fullWidth = false,
  sx = {}
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTelegramClick = () => {
    if (telegramUrl) {
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    }
    handleClose();
  };

  const handleZangiClick = () => {
    // Zangi não suporta mensagens pré-configuradas via URL da mesma forma que Telegram
    // O link abre a conversa diretamente
    window.open(zangiUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        startIcon={<ChatIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        sx={{
          ...sx,
        }}
      >
        Chat
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 280,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
          }
        }}
      >
        {/* Info message */}
        <Box sx={{ px: 2, py: 1.5, backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(0,191,165,0.1)' : 'rgba(0,191,165,0.05)' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              color: theme => theme.palette.mode === 'dark' ? '#B4B4C8' : '#5F5F7A',
              lineHeight: 1.4,
              fontSize: '0.75rem'
            }}
          >
            💡 <strong>Tip:</strong> If Telegram messages fail, try Zangi for secure and reliable communication.
          </Typography>
        </Box>
        
        <Divider sx={{ my: 0.5 }} />

        <MenuItem 
          onClick={handleTelegramClick}
          disabled={!telegramUrl}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: theme => theme.palette.mode === 'dark'
                ? 'rgba(239,83,80,0.15)'
                : 'rgba(211,47,47,0.08)',
            }
          }}
        >
          <ListItemIcon>
            <TelegramIcon sx={{ color: '#0088cc' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Telegram" 
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          />
        </MenuItem>

        <MenuItem 
          onClick={handleZangiClick}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: theme => theme.palette.mode === 'dark'
                ? 'rgba(239,83,80,0.15)'
                : 'rgba(211,47,47,0.08)',
            }
          }}
        >
          <ListItemIcon>
            <MessageIcon sx={{ color: '#00BFA5' }} />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Zangi</span>
                <Chip 
                  label="NEW" 
                  size="small" 
                  sx={{ 
                    height: 18,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00E676 0%, #00BFA5 100%)',
                    color: 'white',
                    '& .MuiChip-label': {
                      px: 0.8,
                      py: 0
                    }
                  }} 
                />
              </Box>
            }
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChatButton;
