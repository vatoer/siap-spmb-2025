# Misc

```sh
git filter-repo --force --commit-callback '
commit.author_name = b"dev"
commit.author_email = b"dev@siap-spmb.com"
commit.committer_name = b"dev"
commit.committer_email = b"dev@siap-spmb.com"
'
``

git remote add origin git@gitvatoer:vatoer/siap-spmb-2025.git
git branch -M main
git push -u origin main

git clone git@gitvatoer:vatoer/siap-spmb-2025.git .

sudo certbot --nginx -d siap-spmb.id -d www.siap-spmb.id

sudo certbot --nginx -d siap-spmb.com -d www.siap-spmb.com

```sh
pm2 start pnpm --name siap_spmb -- start -p 3040
```
