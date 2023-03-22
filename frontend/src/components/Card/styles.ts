import styled from 'styled-components';

type AvatarImageProps = {
  avatarUrl: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 200px;
  height: 250px;
  border: 1px solid #14213d;
  box-shadow: #14213d 0px 8px 12px;
  background-color: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #14213d94;
  position: relative;
`;

export const Image = styled.div`
  background-image: url(${({ url }: { url: string }) => url});
  background-position: center;
  background-size: 5rem 5rem;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

export const Avatar = styled.div`
  background-image: url(${({ avatarUrl }: AvatarImageProps) => avatarUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const Info = styled.div`
  width: 100%;
  height: 125px;
  padding: 0.5rem 1rem;
`;

export const Stars = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  gap: 10px;

  p {
    font-size: 1.0rem;
    font-weight: bold;
  }
`;

export const Name = styled.p`
  font-size: 1.0rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  max-height: 2.6rem;
  line-height: 1.4rem;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
`;